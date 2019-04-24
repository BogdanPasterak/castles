class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.castel = false;
        this.owner = {};
        this.level = 0;
    }
}

(function(){
    let model = {
        boadr_width : 4,
        boadr_height : 4,
        init : function() {
            console.log(model);
        }
    };

    let view = {
        init : function() {
            console.log('init view');
        }
    };

    let controller = {
        init : function() {
            model.init();
            view.init();
            console.log('start');
        }

    };

    controller.init();
})();