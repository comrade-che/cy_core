import Data1 from "../fixtures/bodyUser.json"
import Data2 from "../fixtures/schemaUserInfo.json"
import Data3 from "../fixtures/schemaUsersFilter.json"
import Data4 from "../fixtures/schemaUser.json"
import Data5 from "../fixtures/schemaUserGroups.json"

const Ajv=require('ajv')
const avj=new Ajv()

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
        
    it('should do get current user info ', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/user',
            qs: {
                groups: true,
                organization: false,
                userData: false,
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

    it('should do get list users by filters ', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/users/list',
            qs: {
                page: 0,
                count: 10,
                org_id: 100000000010,
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
        })
    });

    it('should do get uses by userID ', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/users/6bd2994e-c6b5-4b28-800e-6a17f54131ea',
            qs: {
                groups: true,
                organization: false,
                userData: false,
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
            const schema = Data4
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
 
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);;
            expect(responce.body).not.be.empty;
            expect(responce.body.id).to.be.eq('6bd2994e-c6b5-4b28-800e-6a17f54131ea');
            expect(responce.body.username).to.be.eq('sergeypetrov');
            expect(responce.body.firstname).to.be.eq('Сергей');
            expect(responce.body.lastname).to.be.eq('Петров');
            expect(responce.body.middlename).to.be.eq('');
        })
    });

    it('should do get uses by userID ', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/users/2-000-000-600%2010-1075834000340/groups',
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
            const schema = Data5
            const validate = avj.compile(schema);
            const isvalid = validate(responce.body);
            expect(isvalid).to.be.true;
 
            //Валидация кода ответа и данных тела ответа
            console.log(responce.body);
            expect(responce.status).to.be.eq(200);;
            expect(responce.body).not.be.empty;
            expect(responce.body.login).to.be.eq('2-000-000-600 10-1075834000340');
        })
    });

    afterEach(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });
});
