export default function requestHandler({ url }, rules) {
    let regex;

    /// Find the rule
    const rule = rules.find(rule => {
        if (!rule.active) {
            return false;
        }

        regex = new RegExp(rule.from);
        return regex.test(url);
    });

    if (rule) {
        return {
            redirectUrl: url.replace(regex, rule.to),
        };
    }

    return false;
}
