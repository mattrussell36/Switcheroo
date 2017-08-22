var RuleMatcher = function(rules){
    var lastRequestId;

    /// Combine all rules
    rules = Object.keys(rules).reduce((arr, group) => {
        return arr.concat(rules[group].paths);
    }, []);

    this.rules = rules;
    console.log(rules);
    this.redirectOnMatch = function(request){
        //console.log(request);
        var rule = _.find(rules, function(rule){
            return rule.active
            && request.url.indexOf(rule.from) > -1
            && request.requestId !== lastRequestId;
        });
        if(rule){
            lastRequestId = request.requestId;
            return {
                redirectUrl : request.url.replace(rule.from, rule.to)
            };
        }
    };
};
