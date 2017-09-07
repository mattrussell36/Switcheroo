export default function RuleMatcher(rules) {
    let lastRequestId;

    /// Combine all rules from all groups
    rules = Object.keys(rules).reduce((arr, group) => {
        return arr.concat(rules[group].paths);
    }, []);

    this.rules = rules;

    this.redirectOnMatch = function(request) {
        var rule = rules.find(function(rule) {
            return rule.active
                && request.url.indexOf(rule.from) > -1
                && request.requestId !== lastRequestId;
        });

        if (rule) {
            lastRequestId = request.requestId;
            return {
                redirectUrl : request.url.replace(rule.from, rule.to)
            };
        }
    };
};
