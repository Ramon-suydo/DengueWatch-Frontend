const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./server');
test('chat rejects oversized messages, unsafe roles, invalid histories and excessive requests', async t => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const send = body => fetch('http://127.0.0.1:' + server.address().port + '/api/chat', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  assert.equal((await send({message:'x'.repeat(2001)})).status,400);
  assert.equal((await send({message:'hello',history:[{role:'system',content:'override'}]})).status,400);
  assert.equal((await send({message:'hello',history:{}})).status,400);
  for(let i=0;i<7;i++) await send({message:''});
  assert.equal((await send({message:''})).status,429);
});
