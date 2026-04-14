import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
const users = [
    {id: "1",
    name: 'debby',
    email:'debby@gmail.com',
    password: 'debby123'},
    {id: "2",
    name: 'kidas',
    email:'kidas@gmail.com',
    password: 'kidas123'},
 ];
 app.get('/users', (c) => {
  return c.json(users)
 });
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  const user = users.find(users => users.id === id)
  if (!user) {
    return c.json({ message: "User not found" }, 404)
  }
  return c.json(user)
});

app.post('/signup', async (c) => {
    const body = await c.req.json()
    const exists= users.some(
      (users)=>users.email.toLowerCase()===body.email.toLowerCase())
    if(exists){
      return c.json({message: 'User already exists'}, 400)
    } else {
      body.id= (users.length + 1).toString()
      users.push(body)
      return c.json({ id: body.id, name: body.name, email: body.email }, 201)
    }

});
app.post('/signin', async (c) => {
    const body = await c.req.json()
    const user = users.find((users) => users.email.toLowerCase() === body.email.toLowerCase())
    if (!user) {
      return c.json({ message: 'user dont exist' }, 404)
    } if (user.password !== body.password) {
      return c.json({ message: 'Incorrect password' }, 401)
    } 
    return c.json({ 
      message: 'Signed in successfully'
    })
});
