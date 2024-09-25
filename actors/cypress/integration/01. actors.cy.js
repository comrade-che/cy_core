import Data0 from "../fixtures/qs.json"
import Data1 from "../fixtures/bodyUser.json"
import Data2 from "../fixtures/schemaActors.json"

const Ajv=require('ajv')
const avj=new Ajv()

describe("API tests Actors. Actors", () =>{
    
    let authToken = null;
    
    const BACKEND_BASE_URL = 'https://rk.test.nspd.rosreestr.gov.ru/api/actors/v2';
    const DEFAULT_BASE_URL = Cypress.config('baseUrl');

    beforeEach("creat access token", () => {
        cy.log('set base url to backend');
        Cypress.config('baseUrl', BACKEND_BASE_URL);
        //creatAccessToken();
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
        
    it('should do get list all types actors', () => {
        cy.request({
            metod: 'GET',
            url: '/actors?' + Data0.qsall,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then((responce) => {
            //Вывод request в консоль
            cy.log(JSON.stringify(responce.body));
            //Валидация кода ответа и данных тела ответа
            expect(responce.status).to.be.eq(200);
            expect(responce.body[0].id).to.be.eq('03386dbe-5185-4b96-900d-c2b1bb368ed6');
            expect(responce.body[0].type).to.be.eq('application');
            expect(responce.body[0].avanpostType).to.be.eq('public');
            expect(responce.body[1].id).to.be.eq('5df251fe-c046-4c1e-a98a-ec4d81c5ebf9');
            expect(responce.body[1].type).to.be.eq('group');
            expect(responce.body[1].avanpostType).to.be.eq('public');
            expect(responce.body[2].id).to.be.eq('6bd2994e-c6b5-4b28-800e-6a17f54131ea');
            expect(responce.body[2].type).to.be.eq('user');
            expect(responce.body[2].avanpostType).to.be.eq('public');
        })
    });

    it('should do get list all types actors - user', () => {
        cy.request({
            metod: 'GET',
            url: '/actors?' + Data0.qsuser,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then((responce) => {
            //Вывод request в консоль
            cy.log(JSON.stringify(responce.body));
            //Валидация JSON schema
            const schema = Data2
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            cy.allure().step('Проверка JSON schema');
            expect(isvalid).to.be.true;
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);
            expect(responce.body[0].id).to.be.eq('6bd2994e-c6b5-4b28-800e-6a17f54131ea');
            expect(responce.body[0].type).to.be.eq('user');
            expect(responce.body[0].avanpostType).to.be.eq('public');
        })
    });

    it('should do get list all types actors - application', () => {
        cy.request({
            metod: 'GET',
            url: '/actors?' + Data0.qsapplication,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then((responce) => {
            //Вывод request в консоль
            cy.log(JSON.stringify(responce.body));
            //Валидация JSON schema
            const schema = Data2
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);
            expect(responce.body[0].id).to.be.eq('03386dbe-5185-4b96-900d-c2b1bb368ed6');
            expect(responce.body[0].type).to.be.eq('application');
            expect(responce.body[0].avanpostType).to.be.eq('public');
        })
    });

    it('should do get list all types actors - group', () => {
        cy.request({
            metod: 'GET',
            url: '/actors?' + Data0.qsgroup,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then((responce) => {
            //Вывод request в консоль
            cy.log(JSON.stringify(responce.body));
            //Валидация JSON schema
            const schema = Data2
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);
            expect(responce.body[0].id).to.be.eq('5df251fe-c046-4c1e-a98a-ec4d81c5ebf9');
            expect(responce.body[0].type).to.be.eq('group');
            expect(responce.body[0].avanpostType).to.be.eq('public');
        })
    });

    afterEach(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });
});
