using AutoMapper;
using Basket.API.Entities;
using Basket.API.GrpcServices;
using Basket.API.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Basket.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _repository;
        private readonly DiscountGrpcService _discountGrpcService;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndPoint;
        public BasketController(IBasketRepository repository,DiscountGrpcService discountGrpcService,IPublishEndpoint publishEndpoint,IMapper mapper)
        {
            _discountGrpcService = discountGrpcService ?? throw new ArgumentNullException(nameof(discountGrpcService));
            _repository=repository?? throw new ArgumentNullException(nameof(repository));
            _publishEndPoint=publishEndpoint?? throw new ArgumentNullException(nameof(publishEndpoint));
            _mapper=mapper?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("{userName}",Name ="GetBasket")]
        [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShoppingCart>> GetBasket(string userName)
        {
            var basket = await _repository.GetBasket(userName);
            return Ok(basket?? new ShoppingCart(userName));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ShoppingCart>> UpdateBasket([FromBody] ShoppingCart basket)
        {
            foreach(var item in basket.Items)
            {
                var coupon = await _discountGrpcService.GetDiscount(item.ProductName==null?"":item.ProductName);
                item.Price -= coupon.Amount;
            }
            
            return Ok(await _repository.UpdateBasket(basket));
        }

        [HttpDelete("{userName}", Name ="DeleteBasket")]
        [ProducesResponseType(typeof(ShoppingCart), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteBasket(string userName)
        {
            await _repository.DeleteBasket(userName);
            return Ok();
        }

        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Accepted)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
        {
            var basket = await _repository.GetBasket(basketCheckout.UserName);

            if(basket==null)
            {
                return BadRequest();
            }

            var eventMessage = _mapper.Map<BasketCheckout>(basketCheckout);

            eventMessage.TotalPrice = basket.TotalPrice;

            await _publishEndPoint.Publish(eventMessage);

            await _repository.DeleteBasket(basket.UserName);

            return Accepted();
        }


    }
}
