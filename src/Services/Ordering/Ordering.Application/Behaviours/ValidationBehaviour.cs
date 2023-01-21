

using FluentValidation;
using MediatR;


namespace Ordering.Application.Behaviours
{
    public class ValidationBehaviour<TReqeust, TResponse> : IPipelineBehavior<TReqeust, TResponse>
        where TReqeust : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TReqeust>> _validators;

        public ValidationBehaviour(IEnumerable<IValidator<TReqeust>> validators)
        {
            _validators = validators?? throw new ArgumentNullException(nameof(validators));
        }

        public async Task<TResponse> Handle(TReqeust request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TReqeust>(request);

                var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));

                var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

                if (failures.Count != 0)
                    throw new ValidationException(failures);


            }


            return await next();
        }
    }
}
