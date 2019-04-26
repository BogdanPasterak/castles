// index.html|style.css|script.js

(function(){
    let model = {
        player : Number,
        board_width : Number,
        board_height : Number,
        size : Number,
        owners : [],
        fields : [],
        
        // initialize model
        init : function() {
            this.player = 1;
            this.board_height = 5;
            this.board_width = 5;
            this.size = this.board_height * this.board_width;
            this.owners = new Array(this.size).fill(0);  
            this.fields = new Array(this.size).fill(0);  
            //console.log(model);
        },

        // return array affect on fields
        getAffects : function (arr) {
            let affects = new Array(this.size).fill(0);

            for (let index = 0; index < this.size; index++) {
                affects[index] += arr[index];
                if (index >= this.board_width) 
                    affects[index] += arr[index - this.board_width];
                if (index % this.board_width > 0)
                    affects[index] += arr[index - 1];
                if (index % this.board_width < this.board_width - 1)
                    affects[index] += arr[index + 1];
                if (index < this.size - this.board_width)
                    affects[index] += arr[index + this.board_width];
                if (affects[index] * arr[index] < 0){
                    // castel on enemy field, destroy castel, recursiwe coll
                    arr[index] = 0;
                    return this.getAffects(arr);
                }
            }
            return affects;
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
                this.fieldsNods[index].innerHTML = "";
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
                //this.fieldsNods[index].innerText = text;
                if (castels[index] != 0) {
                    let color = (castels[index] > 0) ? 'color-red' : 'color-green';
                    let base = document.createElement('div');
                    base.classList.add('base', color);
                    base.innerText = castels[index];
                    this.fieldsNods[index].append(base)
                }
            }
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
            if (model.fields[index] * model.player >= 0 &&
                model.owners[index] * model.player < 5 &&
                model.owners[index] * model.player >= 0) {

                model.owners[index] += model.player;
                model.fields = model.getAffects(model.owners);
                view.repanitFields(model.fields, model.owners);
                model.player *= -1;    
            }
        }

    };

    controller.init();
})();