import { NgxSpinnerService } from "ngx-spinner";

export class LoadingService{
    loadingReqCount=0;

    constructor(private spinnderService:NgxSpinnerService){}

    loading(){
        this.loadingReqCount++;
        this.spinnderService.show(undefined,{
            type:'ball-spin-sync',
            bdColor:'rgba(255,255,255,0.7)',
            color:'#333333'
        });
    }

    idle(){
        this.loadingReqCount--;
        if(this.loadingReqCount<=0){
            this.loadingReqCount=0;
            this.spinnderService.hide();
        }
    }
}