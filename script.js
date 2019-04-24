(function(){
    let model = {
        init : function() {
            console.log('init model');
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