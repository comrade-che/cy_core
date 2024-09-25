import Data1 from "../fixtures/bodyUser.json"

describe("API tests Actors. Users Info", () =>{
    
    const BACKEND_BASE_URL = 'https://rk.test.nspd.rosreestr.gov.ru/api/actors/v2';
    const DEFAULT_BASE_URL = Cypress.config('baseUrl');
    
    let authToken = null;

    beforeEach("creat access token", () => {
        cy.log('set base url to backend');
        Cypress.config('baseUrl', BACKEND_BASE_URL);
        cy.request({
            metod: 'POST',
            url: 'https://sso.test.nspd.rosreestr.gov.ru/oauth2/token',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Data1
        }).then((responce) => {
            authToken = responce.body.access_token;
        })
    });
        
    it('should do validate', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/validate',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            response: []
         /* }).should((responce) => {
            cy.log(JSON.stringify(responce.body)) */
        })
        .then((responce ) => { 
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);
            expect(responce.body).to.be.eq('OK');
        })
    });

    afterEach(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });
});
