let TestoviParser = (function () {
    const dajTacnost = function (Json) {
        // Neispravan format JSONa
        try {
            const proba = JSON.parse(Json);
        } catch (error) {
            return JSON.parse('{"tacnost":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        }
        // Ispravan format JSONa
        const obj = JSON.parse(Json);
        const brTestova = obj.stats.tests;
        const prosliTestovi = obj.stats.passes;
        var rezultatniJson = '{"tacnost":"';
        rezultatniJson += (Math.round(10 * (100 * prosliTestovi / brTestova)) / 10) + '%","greske":[';
        const greske = obj.failures;
        for (let i = 0; i < greske.length; i++) {
            rezultatniJson += '"' + greske[i].fullTitle + '",';
        }

        if (greske.length != 0)
            rezultatniJson = rezultatniJson.slice(0, -1);
        rezultatniJson += ']}';
        return JSON.parse(rezultatniJson);
    }

    const porediRezultate = function (rezultat1, rezultat2) {
        // provjera dobrog formata JSONa
        try {
            const proba1 = JSON.parse(rezultat1);
            const proba2 = JSON.parse(rezultat2);
        } catch (error) {
            return JSON.parse('{"promjena":"0%","greske":["Testovi se ne mogu izvršiti"]}');
        }

        var rez1 = JSON.parse(rezultat1);
        var rez2 = JSON.parse(rezultat2);
        var testovi1 = rez1.tests;
        var testovi2 = rez2.tests;
        var istiSu = true;
        if(testovi1.length != testovi2.length)
            istiSu = false;
        // isti testovi 
        if (testovi1.length == testovi2.length) {
            for (let i = 0; i < testovi1.length; i++) {
                if (!testovi2.some(test => test.fullTitle == testovi1[i].fullTitle)) {
                    istiSu = false;
                    break;
                }
            }
        }
        if (istiSu) {
            // rezultat od rez2, greske od rez2
            var jsonString = '{"promjena":"';
            var tacnost2 = dajTacnost(rezultat2);
            jsonString += tacnost2.tacnost + '","greske":[';
            var greske2 = dajTacnost(rezultat2).greske;
            greske2.sort();
            for (let i = 0; i < greske2.length; i++)
                jsonString += '"' + greske2[i] + '",';

            if (greske2.length != 0)
                jsonString = jsonString.slice(0, -1);
            jsonString += ']}';
            return JSON.parse(jsonString);
        }
        // razliciti testovi
        // x = (broj testova koji padaju u rezultatu1 a ne pojavljuju se u rezultatu2 + broj testova koji padaju u
        // rezultatu2)/(broj testova koji padaju u rezultatu1 a ne pojavljuju se u
        // rezultatu2 + broj testova u rezultatu2)*100.
        else {
            var testoviPadajuRez1NemaIhRez2 = 0;
            var brojnik = 0;
            var nazivnik = 0;
            var paliTestovi1 = rez1.failures;
            var paliTestovi2 = rez2.failures;
            var greske1 = [];
            for (let i = 0; i < paliTestovi1.length; i++) {
                if (!testovi2.some(test => test.fullTitle == paliTestovi1[i].fullTitle)) {
                    testoviPadajuRez1NemaIhRez2++;
                    greske1.push(paliTestovi1[i].fullTitle);
                }
            }

            brojnik = testoviPadajuRez1NemaIhRez2 + paliTestovi2.length;
            nazivnik = testoviPadajuRez1NemaIhRez2 + testovi2.length;
            var promjena = Math.round(10 * ((brojnik / nazivnik) * 100)) / 10;

            var jsonString = '{"promjena":"' + promjena + '%","greske":[';
            greske1.sort();
            var greske2 = dajTacnost(rezultat2).greske;
            greske2.sort();

            for (let i = 0; i < greske1.length; i++)
                jsonString += '"' + greske1[i] + '",';

            for (let i = 0; i < greske2.length; i++)
                jsonString += '"' + greske2[i] + '",';

            if (greske1.length != 0 || greske2.length != 0)
                jsonString = jsonString.slice(0, -1);

            jsonString += ']}';
            return JSON.parse(jsonString);
        }
    }

    return {
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    }
}());





