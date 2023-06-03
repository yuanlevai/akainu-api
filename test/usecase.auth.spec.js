const AuthUseCase = require('../usecase/auth')
const bcrypt = require('bcrypt')
require('dotenv').config();

const mockAuthRepo = () => {
    const repo = {}
    repo.loginUser = jest.fn().mockReturnValue({
        id: 1,
        name: "test",
        email: "risusanto@gmail.com",
        address: "jakarta",
        password: bcrypt.hashSync("1234", 10)
    })

    return repo
}
const repo = mockAuthRepo()
const authUC = new AuthUseCase(repo)

// auth test suite
describe('Auth Test Suite', function () {
    // test cases
    test('login success', async () => {
       let res =  await authUC.login('risusanto@gmail.com', "1234")
        expect(res.is_success).toEqual(true)
        expect(res.data === null).toEqual(false)
    })

    test('login failed', async () => {
        repo.loginUser = jest.fn().mockReturnValue(null)
        let res =  await authUC.login('risusanto@gmail.com', "1234")

        expect(res.is_success).toEqual(false)
        expect(res.reason).toEqual("invalid username or password!")
    })
});