// index.html|style.css|script.js
class Field {
    constructor() {
        this.castel = 0;
        this.affect = 0;
    }
}


(function(){
    let model = {
        player : Number,
        board_width : Number,
        board_height : Number,
        size : Number,
        //owners : [],
        fields : [],
        
        // initialize model
        init : function() {
            this.player = 1;
            this.board_height = 5;
            this.board_width = 5;
            this.size = this.board_height * this.board_width;
            //this.owners = new Array(this.size).fill(0);  
            this.fields = []; 
            for (let i = 0; i < this.size; i++) {
                this.fields.push( new Field());
            } 
            //console.log(model);
        },

        // calc affect on fields
        calcAffect : function (arr) {

            for (let index = 0; index < this.size; index++) {
                let field = arr[index];
                field.affect = field.castel;
                if (index >= this.board_width) {
                    field.affect += arr[index - this.board_width].castel;
                }
                if (index % this.board_width > 0) {
                    field.affect += arr[index - 1].castel;
                }
                if (index % this.board_width < this.board_width - 1) {
                    field.affect += arr[index + 1].castel;
                }
                if (index < this.size - this.board_width) {
                    field.affect += arr[index + this.board_width].castel;
                }
                if (field.affect * field.castel < 0){
                    // castel on enemy field, destroy castel, recursive coll
                    field.castel = 0;
                    this.calcAffect(arr);
                    break;
                }
            };
            return;
        },

        canBuild : function (player, place) {

        }

    };

    let view = {
        fieldsNods : [],
        headPlayer : Element,

        // initialize board game
        init : function(b_height, b_width) {
            board = document.querySelector('.board');
            this.headPlayer = document.querySelector('.head_player');
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

        repanitFields : function(fields) {
            
            for (let index = 0; index < this.fieldsNods.length; index++) {
                // castel
                let list = 'field';
                this.fieldsNods[index].innerHTML = "";
                let text = "";
                if (fields[index].castel > 0) {
                    text += fields[index].castel;
                    list += ' castel1';
                } 
                if (fields[index].castel < 0) {
                    text += fields[index].castel * -1;
                    list += ' castel2';
                } 
                if (fields[index].affect > 0) {
                    text += "," + fields[index].affect;
                    list += ' player1';
                } 
                if (fields[index].affect < 0) {
                    text += "," + fields[index].affect* - 1;
                    list += ' player2';
                }
                this.fieldsNods[index].classList = list;
                this.fieldsNods[index].innerText = text;
                // if (fields[index].castel != 0) {
                //     let color = (castels[index] > 0) ? 'color-red' : 'color-green';
                //     let base = document.createElement('div');
                //     base.classList.add('base', color);
                //     base.innerText = castels[index];
                //     this.fieldsNods[index].append(base)
                // }
            }
        },

        repanitHeder : function(player, fields, castels) {
            this.headPlayer.innerHTML = ((player == 1) ? 'Red' : 'Green');
            
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

            // not enemy field and no more than 5 and not enemy castel
            if (model.fields[index].affect * model.player >= 0 &&
                model.fields[index].castel * model.player < 5 &&
                model.fields[index].castel * model.player >= 0) {

                model.fields[index].castel += model.player;
                model.calcAffect(model.fields);
                model.player *= -1;    
                view.repanitHeder(model.player, model.fields);
                view.repanitFields(model.fields);
            }
        }

    };

    controller.init();
})();