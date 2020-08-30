const { User } = require('../models');

class SessionController {
    async store(request, response){
        const { email, password } = request.body;
        
        const user = await User.findOne({ where: { email }})

        if(!user) 
            return response.status(401).json({ message: 'User not found' });

        if(!(await user.checkPassword(password)))
            return response.status(401).json({ message: 'Incorrect password'});

        return response.status(200).send({ 
            user,
            token: user.generateToken()
        });
    }
}

module.exports = new SessionController();