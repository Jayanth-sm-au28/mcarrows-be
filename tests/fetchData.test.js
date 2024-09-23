const axios = require('axios');
const { fetchDataFromApis } = require('../controllers/apiControllers');

jest.mock('axios'); 

test('should fetch data from APIs concurrently', async () => {
    const mockData1 = { data: 'API1 data' };
    const mockData2 = { data: 'API2 data' };

    axios.get.mockResolvedValueOnce(mockData1).mockResolvedValueOnce(mockData2);

    const data = await fetchDataFromApis(['https://api1.com', 'https://api2.com']);
    
    expect(data).toEqual([mockData1.data, mockData2.data]);
});
