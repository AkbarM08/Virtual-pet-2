class Food{
    constructor(){
        this.foodStock=foodS;
        this.lastFed
        this.milk = loadImage("milkBottle.png");
    }
    getFoodStock(){
        
    }

    updateFoodStock(){

    }

    deductFood(){

    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.milk,450,240,70,70);

        if(this.foodStock!=0){
            console.log("first if block works")
            for(var i=0;i<foodS;i++){
                console.log("for loop works");
                if(i%10===0){
                    console.log("second if block works");
                    x=80;
                    y=y+50;
                }
                image(this.milk,x,y,50,50);
                x=x+30;
            }
        }
    }
}
