let assert = chai.assert;
describe('TestoviParser', function () {
    describe('porediRezultate()', function () {
        it('Isti broj testova1', function () {
            var json1 = {
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
            var json2 = {
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
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
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
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json2));
            assert.equal(JSON.stringify(test1), '{"promjena":"100%","greske":[]}');
        });

        it('Isti broj testova2', function () {
            var json1 = {
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
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
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
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": []
            }
            var json2 = {
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
                        "title": "treba proci2",
                        "fullTitle": "Treba proci 2",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
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
                        "title": "treba proci1",
                        "fullTitle": "Treba proci 1",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
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
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json2));
            assert.equal(JSON.stringify(test1), '{"promjena":"50%","greske":["Treba proci 1"]}');
        });

        it('Razlicit broj testova1', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 1,
                    "pending": 0,
                    "failures": 2,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 PASS",
                        "fullTitle": "T2 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T3 FAIL",
                        "fullTitle": "T3 FAIL",
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
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T3 FAIL",
                        "fullTitle": "T3 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T2 PASS",
                        "fullTitle": "T2 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var json2 = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 2,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 PASS",
                        "fullTitle": "T2 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
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
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json2));
            assert.equal(JSON.stringify(test1), '{"promjena":"50%","greske":["T3 FAIL","T2 FAIL"]}');
        });

        it('Razlicit broj testova2', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 4,
                    "passes": 1,
                    "pending": 0,
                    "failures": 3,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
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
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var json2 = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 2,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T3 PASS",
                        "fullTitle": "T3 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
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
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T3 PASS",
                        "fullTitle": "T3 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json2));
            assert.equal(JSON.stringify(test1), '{"promjena":"60%","greske":["T2 FAIL","T5 FAIL","T1 PASS"]}');
        });

        it('Razlicit broj testova3', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 1,
                    "passes": 0,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "failures": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": []
            }
            var json2 = {
                "stats": {
                    "suites": 2,
                    "tests": 3,
                    "passes": 2,
                    "pending": 0,
                    "failures": 1,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 PASS",
                        "fullTitle": "T2 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T3 FAIL",
                        "fullTitle": "T3 FAIL",
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
                        "title": "T3 FAIL",
                        "fullTitle": "T3 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 FAIL",
                        "fullTitle": "T1 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 PASS",
                        "fullTitle": "T2 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json2));
            assert.equal(JSON.stringify(test1), '{"promjena":"33.3%","greske":["T3 FAIL"]}');
        });

        it('Izuzetak1', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 4,
                    "passes": 1,
                    "pending": 0,
                    "failures": 3,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
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
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), "Ovo nije JSON format");
            assert.equal(JSON.stringify(test1), '{"promjena":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });
        it('Izuzetak2', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 4,
                    "passes": 1,
                    "pending": 0,
                    "failures": 3,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
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
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate("Ovo nije JSON fomat" , JSON.stringify(json1));
            assert.equal(JSON.stringify(test1), '{"promjena":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });
        it('Izuzetak3', function () {
            var json1 = {
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
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
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "passes": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json1));
            assert.equal(JSON.stringify(test1), '{"promjena":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });
        it('Izuzetak4', function () {
            var json1 = {
                "stats": {
                    "suites": 2,
                    "tests": 4,
                    "passes": 1,
                    "pending": 0,
                    "failures": 3,
                    "start": "2021-11-05T15:00:26.343Z",
                    "end": "2021-11-05T15:00:26.352Z",
                    "duration": 9
                },
                "tests": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 1,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T2 FAIL",
                        "fullTitle": "T2 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T4 FAIL",
                        "fullTitle": "T4 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    },
                    {
                        "title": "T5 FAIL",
                        "fullTitle": "T5 FAIL",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ],
                "pending": [],
                "passes": [
                    {
                        "title": "T1 PASS",
                        "fullTitle": "T1 PASS",
                        "file": null,
                        "duration": 0,
                        "currentRetry": 0,
                        "speed": "fast",
                        "err": {}
                    }
                ]
            }
            var test1 = TestoviParser.porediRezultate(JSON.stringify(json1), JSON.stringify(json1));
            assert.equal(JSON.stringify(test1), '{"promjena":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        });
    });
});
