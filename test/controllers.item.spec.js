const itemController = require('../controllers/item')

let mockItemUC = {
    getProducts: jest.fn().mockReturnValue(null)
}

const mockRequest = (body={},query={},params={}, use_cases={}) => {
    return {
        body: body,
        query: query,
        params: params,
        ...use_cases
    }
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    return res
}

describe('Test Item Controller', function () {
    test('get empty items', async () => {
        let req = mockRequest({},{}, {}, {
            itemUC: mockItemUC
        })
        let res = mockResponse()
        await itemController.list(req, res)

        expect(mockItemUC.getProducts).toBeCalledWith(null)
        expect(res.json).toBeCalledWith([])
    })
});