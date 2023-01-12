'use strict';

const { expect } = require('chai');
const app = require('../../app.js');
// const chai = require('chai');
// const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {

        // expect(1+2).to.be(3);
        const result = await app.lambdaPostHandler(event, context)

        console.log(result);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        // expect(response).to.be.an('object');
        expect(response.message).to.be.equal("hello world");
        expect(response.location).to.be.an("string");
    });
});
