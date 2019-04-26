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
        size : Number,
        owners : [],
        
        // initialize model
        init : function() {
            this.player = 1;
            this.board_height = 4;
            this.board_width = 4;
            this.size = this.board_height * this.board_width;
            this.owners = new Array(this.size).fill(0);  
            //console.log(model);
        },

        // return array affect on fields
        getAffects : function (arr) {
            let affects = new Array(this.size).fill(0);

            for (let index = 0; index < this.size; index++) {
                if (index >= this.board_width) 
                    affects[index] += arr[index - this.board_width];
                if (index % this.board_width > 0)
                    affects[index] += arr[index - 1];
                if (index % this.board_width < this.board_width - 1)
                    affects[index] += arr[index + 1];
                if (index < this.size - this.board_width)
                    affects[index] += arr[index + this.board_width];
            }
            return affects;
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
                        if (f.level > 0) {
                            // neighbors.affect - level 
                            f.level = 0;
                        }
                        f.owner = this.player;
                        f.affect = 1;
                    } else { // owner opponent
                        f.affect--;
                        if (f.affect == 0) {
                            f.owner = 0;
                        }
                    }
                    //console.log(f);
                });
                // next round
                this.player = (this.player == 1) ? 2 : 1;
                return neighbors;
            }
            return false;
        }

    };

    let view = {
        fieldsNods : [],

        // initialize board game
        init : function(b_height, b_width) {
            board = document.querySelector('.board');
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
                    this.fieldsNods.push(fieldNode);
                }
                board.append(rowNode);  
            }
            //console.log(this.fieldsNods);
        },
        repanitFields : function(fields, castels) {
            
            for (let index = 0; index < this.fieldsNods.length; index++) {
                // castel
                let list = 'field';
                let text = "";
                if (castels[index] > 0) {
                    text += castels[index];
                    list += ' castel1';
                } 
                if (castels[index] < 0) {
                    text += castels[index] * -1;
                    list += ' castel2';
                } 
                if (fields[index] > 0) {
                    text += "," + fields[index];
                    list += ' player1';
                } 
                if (fields[index] < 0) {
                    text += "," + fields[index] * - 1;
                    list += ' player2';
                }
                this.fieldsNods[index].classList = list;
                this.fieldsNods[index].innerText = text;
            }
            return;
            // background
            if (fNode.classList.contains('player1') && f.owner != 1 ){
                fNode.classList.remove('player1');
                if (f.owner == 2) {
                    fNode.classList.add('player2');
                }
            } else if (fNode.classList.contains('player2') && f.owner != 2 ){
                fNode.classList.remove('player2');
                if (f.owner == 1) {
                    fNode.classList.add('player1');
                }
            } else if (f.owner > 0) {
                fNode.classList.add('player' + f.owner);
            }
            // castel
            if (f.level > 0){
                fNode.innerText = f.level + "," + f.affect;
                if (! fNode.classList.contains('castel' + f.owner)) {
                    fNode.classList.add('castel' + f.owner);
                }
            } else {
                fNode.innerText = "";
            }
            console.log(fNode);
        }
    };

    let controller = {
        init : function() {
            model.init();
            view.init(model.board_height, model.board_width);
            console.log('start');
        },
        clickField : function(e){
            let index = Number(e.target.id);

            model.owners[index] += model.player;
            model.player *= -1;
            view.repanitFields(model.getAffects(model.owners), model.owners);

            // if pasible update field and neighbors
            /*
            let neighbors = model.updateField(index);
            if ( neighbors ){
                console.log(neighbors);
                view.repanitField(index, model.fields[index]);
                neighbors.forEach((i) => view.repanitField(i, model.fields[i]));
            }
            */
        }

    };

    controller.init();
})();