'use strict'
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))
require('sinon-as-promised')

describe('BankID', () => {
  let BankID, bankid, soap, fs, messages, ClientSecurity
  beforeEach(() => {
    soap = {
      createClient: sinon.stub()
    }
    fs = {
      readFileSync: sinon.stub()
    }
    messages = {}
    ClientSecurity = sinon.stub()

    BankID = proxyquire(`${process.cwd()}/lib/`, {
      'soap': soap,
      'fs': fs,
      './messages': messages,
      './ClientSecurity': ClientSecurity
    })
  })
  describe('constructor', () => {
    let config
    beforeEach(() => {
      config = {
        pfx: Buffer.from([])
      }
    })
    it('it is not ready until soap client is succesfully created', () => {
      bankid = new BankID(config)
      
      expect(bankid.isReady).to.be.false
    })
    it('accepts a Buffer as PFX', () => {
      bankid = new BankID(config)
      
      expect(bankid.PFX).to.equal(config.pfx)
    })
    it('uses pfx path to load a cert if pfx is a string', () => {
      config.pfx = './path/to/cert'
      bankid = new BankID(config)

      expect(fs.readFileSync)
        .calledOnce
        .calledWith('./path/to/cert')
    })
  })
})