let assert = chai.assert;
describe('TestoviParser', function () {
    describe('dajTacnost()', function () {
        it('Prolaze svi testovi', function () {
            var json = {
                "stats": {
                    "suites": 2,
                    "tests": 2,
                    "passes": 2,
                    "pending": 0,
                    "failures": 0,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "failures": [],
                "passes": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.dajTacnost(JSON.stringify(json));
            assert.equal(JSON.stringify(test1), '{"tacnost":"100%","greske":[]}');
        });

        it('Padaju svi testovi', function () {
            var json = {
                "stats": {
                    "suites": 2,
                    "tests": 2,
                    "passes": 0,
                    "pending": 0,
                    "failures": 2,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "ne treba proci1",
                        "fullTitle": "Ne treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "failures": [
                    {
                        "title": "ne treba proci1",
                        "fullTitle": "Ne treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": []
            }
            var test1 = TestoviParser.dajTacnost(JSON.stringify(json));
            assert.equal(JSON.stringify(test1), '{"tacnost":"0%","greske":["Ne treba proci 1","Ne treba proci 2"]}');
        });

        it('Prolazi jedan test-cjelobrojni postotak', function () {
            var json = {
                "stats": {
                    "suites": 2,
                    "tests": 2,
                    "passes": 1,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "failures": [
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                ]
            }
            var test1 = TestoviParser.dajTacnost(JSON.stringify(json));
            assert.equal(JSON.stringify(test1), '{"tacnost":"50%","greske":["Ne treba proci 2"]}');
        });

        it('Prolazi jedan test-decimalni postotak', function () {
            var json = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 1,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci3",
                        "fullTitle": "Ne treba proci 3",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "failures": [
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci3",
                        "fullTitle": "Ne treba proci 3",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                ]
            }
            var test1 = TestoviParser.dajTacnost(JSON.stringify(json));
            assert.equal(JSON.stringify(test1), '{"tacnost":"33.3%","greske":["Ne treba proci 2","Ne treba proci 3"]}');
        });

        it('Pogresan JSON format-testovi se ne mogu izvrsiti1', function () {
            var json = "Ovo nije JSON format!";
            var test1 = TestoviParser.dajTacnost(json);
            assert.equal(JSON.stringify(test1), '{"tacnost":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });

        it('Pogresan JSON format-testovi se ne mogu izvrsiti2', function () {
            var json = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 1,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "pending": [],
                "failures": [
                    {
                        "title": "ne treba proci2",
                        "fullTitle": "Ne treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "ne treba proci3",
                        "fullTitle": "Ne treba proci 3",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                ]
            }
            var test1 = TestoviParser.dajTacnost(json);
            assert.equal(JSON.stringify(test1), '{"tacnost":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });
    });
});
