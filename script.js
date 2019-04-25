class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.castel = false;
        this.owner = 0;
        this.level = 0;
    }
}

(function(){
    let model = {
        player : Number,
        boadr_width : Number,
        boadr_height : Number,
        fields : [],
        init : function() {
            this.player = 1;
            this.boadr_height = 4;
            this.boadr_width = 4;
            for (let row = 0; row < this.boadr_height; row++) {
                for (let col = 0; col < this.boadr_width; col++) {
                    this.fields.push(new Field(row, col));   
                }
            }
            console.log(model);
        },
        updateField : function(index) {
            console.log("player",this.player);
            let field = this.fields[index];
            if ((field.owner == 0 || field.owner == this.player) && field.level < 5) {
                field.owner = this.player;
                field.level++;
                this.player = (this.player == 1) ? 2 : 1;

                console.log(field);
                return true;
            }
            return false;
        }
    };

    let view = {
        board : Element,

        init : function(b_height, b_width) {
            this.board = document.querySelector('.board');
            let index = 0;
            for (let row = 0; row < b_height; row++) {
                let rowNode = document.createElement('div');
                rowNode.classList.add('row');
                for (let col = 0; col < b_width; col++) {
                    let fieldNode = document.createElement('div');
                    fieldNode.classList.add('field');
                    fieldNode.setAttribute('id',index++)
                    fieldNode.addEventListener('click', controller.clickField);
                    rowNode.append(fieldNode);
                }
                this.board.append(rowNode);  
            }
            console.log(this.board);
        }
    };

    let controller = {
        init : function() {
            model.init();
            view.init(model.boadr_height, model.boadr_width);
            console.log('start');
        },
        clickField : function(e){
            if (model.updateField(Number(e.target.id))){
                //console.log(model.fields[Number(e.target.id)]);
            }
        }

    };

    controller.init();
})();