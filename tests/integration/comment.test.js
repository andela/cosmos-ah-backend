import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { comment, invalidComment } from '../mock/comment';

const { assert } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('POST comment on article', () => {
  beforeEach(async () => {
    app = await startServer(5500);
    agent = chai.request(app);
  });

  it('article added successfully', (done) => {
    agent.post('/api/v1/article/comment')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OWVhYTJlLTViOGYtNDEwMy04MTkyLTQ2MzlhZmFlMmJhOSIsImZ1bGxOYW1lIjoiQ2hpa2UgT3p1bHVtYmEiLCJiaW8iOiJIb2xkIG9uIG5vdywgYXJlbid0IHRoZXJlIGFscmVhZHkgc3BlY3MgZm9yIHRoaXMga2luZCBvZiB0aGluZz8gLSBXZWxsLi4uIG5vLiBXaGlsZSB0aGVyZSBhcmUgYSBmZXcgaGFuZHkgc3BlY2lmaWNhdGlvbnMgZm9yIGRlYWxpbmcgd2l0aCBKU09OIGRhdGEsIG1vc3Qgbm90YWJseSBEb3VnbGFzIENyb2NrZm9yZCdzIEpTT05SZXF1ZXN0IHByb3Bvc2FsLCB0aGVyZSdzIG5vdGhpbmcgdG8gYWRkcmVzcyB0aGUgcHJvYmxlbXMgb2YgZ2VuZXJhbCBhcHBsaWNhdGlvbi1sZXZlbCBtZXNzYWdpbmcuIE1vcmUgb24gdGhpcyBsYXRlci4iLCJlbWFpbCI6ImNoaWtlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY2hpa2VvenVsdW1iYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTA4MTE3NCwiZXhwIjoxNTg2NjE3MTc0fQ.0jcdr45n6BGKM2nZ_C9_XMYw3vBq5V3XMbpeZm86Rfo')
      .send(comment)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 201);
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.property(body, 'data');
        done();
      });
  });

  it('invalid comment article id', (done) => {
    agent.post('/api/v1/article/comment')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OWVhYTJlLTViOGYtNDEwMy04MTkyLTQ2MzlhZmFlMmJhOSIsImZ1bGxOYW1lIjoiQ2hpa2UgT3p1bHVtYmEiLCJiaW8iOiJIb2xkIG9uIG5vdywgYXJlbid0IHRoZXJlIGFscmVhZHkgc3BlY3MgZm9yIHRoaXMga2luZCBvZiB0aGluZz8gLSBXZWxsLi4uIG5vLiBXaGlsZSB0aGVyZSBhcmUgYSBmZXcgaGFuZHkgc3BlY2lmaWNhdGlvbnMgZm9yIGRlYWxpbmcgd2l0aCBKU09OIGRhdGEsIG1vc3Qgbm90YWJseSBEb3VnbGFzIENyb2NrZm9yZCdzIEpTT05SZXF1ZXN0IHByb3Bvc2FsLCB0aGVyZSdzIG5vdGhpbmcgdG8gYWRkcmVzcyB0aGUgcHJvYmxlbXMgb2YgZ2VuZXJhbCBhcHBsaWNhdGlvbi1sZXZlbCBtZXNzYWdpbmcuIE1vcmUgb24gdGhpcyBsYXRlci4iLCJlbWFpbCI6ImNoaWtlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY2hpa2VvenVsdW1iYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTA4MTE3NCwiZXhwIjoxNTg2NjE3MTc0fQ.0jcdr45n6BGKM2nZ_C9_XMYw3vBq5V3XMbpeZm86Rfo')
      .send(invalidComment)
      .end((_err, res) => {
        const { status, body } = res;
        console.log({ status, body });
        assert.equal(status, 404);
        assert.isObject(body);
        assert.equal(body.message, 'invalid article id');
        done();
      });
  });
  it('invalid comment ', (done) => {
    agent.post('/api/v1/article/comment')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OWVhYTJlLTViOGYtNDEwMy04MTkyLTQ2MzlhZmFlMmJhOSIsImZ1bGxOYW1lIjoiQ2hpa2UgT3p1bHVtYmEiLCJiaW8iOiJIb2xkIG9uIG5vdywgYXJlbid0IHRoZXJlIGFscmVhZHkgc3BlY3MgZm9yIHRoaXMga2luZCBvZiB0aGluZz8gLSBXZWxsLi4uIG5vLiBXaGlsZSB0aGVyZSBhcmUgYSBmZXcgaGFuZHkgc3BlY2lmaWNhdGlvbnMgZm9yIGRlYWxpbmcgd2l0aCBKU09OIGRhdGEsIG1vc3Qgbm90YWJseSBEb3VnbGFzIENyb2NrZm9yZCdzIEpTT05SZXF1ZXN0IHByb3Bvc2FsLCB0aGVyZSdzIG5vdGhpbmcgdG8gYWRkcmVzcyB0aGUgcHJvYmxlbXMgb2YgZ2VuZXJhbCBhcHBsaWNhdGlvbi1sZXZlbCBtZXNzYWdpbmcuIE1vcmUgb24gdGhpcyBsYXRlci4iLCJlbWFpbCI6ImNoaWtlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY2hpa2VvenVsdW1iYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTA4MTE3NCwiZXhwIjoxNTg2NjE3MTc0fQ.0jcdr45n6BGKM2nZ_C9_XMYw3vBq5V3XMbpeZm86Rfo')
      .end((_err, res) => {
        const { status, body } = res;
        console.log({ status, body });
        assert.equal(status, 400);
        assert.isObject(body);
        done();
      });
  });
});
