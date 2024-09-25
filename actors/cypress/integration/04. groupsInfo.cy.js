import Data1 from "../fixtures/bodyUser.json"
import Data2 from "../fixtures/schemaGroupApplications.json"
import Data3 from "../fixtures/schemaGroupUsers.json"
import Data4 from "../fixtures/schemaGroups.json"
import Data5 from "../fixtures/schemaGroup.json"

const Ajv=require('ajv')
const avj=new Ajv()

describe("API tests Actors. Groups Info", () =>{
    
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
        
    it('should do get list applications for group to groupID', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/group/5df251fe-c046-4c1e-a98a-ec4d81c5ebf9/apps',
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

    it('should do get list users for group to groupID', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/group/5df251fe-c046-4c1e-a98a-ec4d81c5ebf9/users',
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

    it('should do get list group', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/groups',
            qs: {
                page: 0,
                count: 5000,
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
        })
    });

    it('should do get group info to groupID', () => {
        cy.request({
            metod: 'GET',
            log: true,
            url: '/groups/5df251fe-c046-4c1e-a98a-ec4d81c5ebf9',
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
        })
    });

    afterEach(() => {
        cy.log('reset base url');
        Cypress.config('baseUrl', DEFAULT_BASE_URL);
    });
});
