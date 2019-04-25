class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.affect = 0;
        this.owner = 0;
        this.level = 0;
    }
}

(function(){
    let model = {
        player : Number,
        board_width : Number,
        board_height : Number,
        fields : [],
        
        // initialize model
        init : function() {
            this.player = 1;
            this.board_height = 4;
            this.board_width = 4;
            for (let row = 0; row < this.board_height; row++) {
                for (let col = 0; col < this.board_width; col++) {
                    this.fields.push(new Field(row, col));   
                }
            }
            console.log(model);
        },

        // where player click on field
        updateField : function(index) {
            //console.log("player",this.player);
            let field = this.fields[index];
            // if is owner or no ovner and level up to 5
            if ((field.owner == 0 || field.owner == this.player) && field.level < 5) {
                let neighbors = this.getNeighbors(index);

                field.owner = this.player;
                field.level++;
                field.affect++;
                // affect the fields next
                neighbors.forEach((n) => {
                    let f = this.fields[n];
                    if (f.owner == this.player) {
                        f.affect++;
                    } else if (f.owner == 0) {
                        f.owner = this.player;
                        f.affect = 1;
                    } else { // owner opponent
                        f.affect--;
                        if (f.affect == 0)
                            f.owner = 0;
                    }
                    //console.log(f);
                });
                // next round
                this.player = (this.player == 1) ? 2 : 1;
                return neighbors;
            }
            return false;
        },

        // return array of index neighbors
        getNeighbors : function(index) {
            let n = [];
            if (index >= this.board_width)
                n.push(index - this.board_width);
            if (index % this.board_width > 0)
                n.push(index - 1);
            if (index % this.board_width < this.board_width - 1)
                n.push(index + 1);
            if (index < this.fields.length - this.board_width)
                n.push(index + this.board_width);
            return n;
        }
    };

    let view = {
        board : Element,

        // initialize board game
        init : function(b_height, b_width) {
            this.board = document.querySelector('.board');
            let index = 0;
            //console.log(b_width, b_height);
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
        },
        repanitField : function(index) {
            
        }
    };

    let controller = {
        init : function() {
            model.init();
            view.init(model.board_height, model.board_width);
            console.log('start');
        },
        clickField : function(e){
            // if pasible update field and neighbors
            let index = Number(e.target.id);
            let neighbors = model.updateField(index);
            if ( neighbors ){
                console.log(neighbors);
                view.repanitField(index);
                neighbors.forEach((i) => view.repanitField(i));
            }
        }

    };

    controller.init();
})();