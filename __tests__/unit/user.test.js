const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async ()=>{
        await truncate();
    });

    it('should encrypt user password', async ()=>{
        const user = await User.create({
            name: 'Adilson',
            email: 'adilsonfuxe.fuxe@gmail.com',
            password: '123'
        });

        const compareHash = await bcrypt.compare('123', user.password_hash);

        expect(compareHash).toBe(true)
    });
});