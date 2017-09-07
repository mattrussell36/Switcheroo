const LocalRulesService = function () {
    this.get = function() {
        return JSON.parse(localStorage.getItem('data') || '{}');
    };

    this.set = function(data){
        localStorage.setItem('data', JSON.stringify(data));
    };
};

export default {
	getRulesService: function() {
		return new LocalRulesService();
	}
};
