const chai = require('chai')
const { expect, should } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiPromise = require('chai-as-promised')

global.expect = expect
global.sinon = sinon

should()
chai.use(sinonChai)
chai.use(chaiPromise)



