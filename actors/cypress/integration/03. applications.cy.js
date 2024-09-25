import Data1 from "../fixtures/bodyUser.json"
import Data2 from "../fixtures/schemaApplications.json"
import Data3 from "../fixtures/schemaApplication.json"

const Ajv=require('ajv')
const avj=new Ajv()

describe("API tests Actors. Applications", () =>{
    
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
        
    it('should do get list applications', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/applications',
            qs: {
                page: 0,
                count: 5000,
                groups: false,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            response: []
         /* }).should((responce) => {
            cy.log(JSON.stringify(responce.body)) */
        })
        .then((responce ) => {
            //Валидация JSON schema
            const schema = Data2
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
 
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);;
            expect(responce.body).not.be.empty;
        })
    });

    it('should do get list applications to ID', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/applications/03386dbe-5185-4b96-900d-c2b1bb368ed6',
            qs: {
                groups: true,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            response: []
         /* }).should((responce) => {
            cy.log(JSON.stringify(responce.body)) */
        })
        .then((responce ) => {
            //Валидация JSON schema
            const schema = Data3
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
 
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);;
            expect(responce.body).not.be.empty;
            expect(responce.body.id).to.be.eq('03386dbe-5185-4b96-900d-c2b1bb368ed6')
            expect(responce.body.actorType).to.be.eq('application')
            expect(responce.body.name).to.be.eq('НСПД')
        })
    });

    afterEach(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });
});
