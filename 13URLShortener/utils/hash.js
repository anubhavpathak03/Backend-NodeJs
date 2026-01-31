import { randomBytes, createHmac } from 'crypto';


export function hashPasswordWithSalt(password, userSalt = undefined) {
    const salt = userSalt ?? randomBytes(256).toString('hex'); // this line generate salt for me

    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');


    return { salt, password: hashedPassword };

}

