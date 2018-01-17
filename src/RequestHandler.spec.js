import requestHandler from './RequestHandler';

describe('requestHandler()', () => {
    const googleUrl = 'https://google.com';
    const yahooUrl = 'https://yahoo.com';
    const rules = [
        { active: true, from: 'abc', to: 'cba' },
        { active: true, from: googleUrl, to: yahooUrl },
        { active: true, from: 'aa', to: 'bb' },
    ]

    test('Should replace part of a url', () => {
        const res = requestHandler({ url: 'http://abc.com/foo/bar' }, rules);
        expect(res.redirectUrl)
            .toBe('http://cba.com/foo/bar')
    });

    test('Should replace an entire url', () => {
        const res = requestHandler({ url: googleUrl }, rules);
        expect(res.redirectUrl).toBe(yahooUrl)
    });

    test('Should return false if not active', () => {
        rules[1].active = false;
        const res = requestHandler({ url: googleUrl }, rules);
        expect(res).toBe(false);
        rules[1].active = true;
    });

    test('Should return false if no matching rule found', () => {
        const res = requestHandler({ url: 'https://foobaz.com', }, rules);
        expect(res).toBe(false);
    });

    test('Should only replace the first match', () => {
        const res = requestHandler({ url: 'https://foo.com/aa/xx/aa/', }, rules);
        expect(res.redirectUrl).toBe('https://foo.com/bb/xx/aa/');
    })
});