import connection from "../../lib/db";



export const resolvers = {
    Query: {
        users: async () => {

            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM users', (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        },
        articles: async () => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM articles', (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {


                        resolve(results);
                    }
                });
            });
        },
        user: async (parent: any, args: any, contextValue: any, info: any) => {
            console.log('QUERY USER', parent);
            console.log('QUERY USER', args);
            console.log('QUERY USER', contextValue);
            console.log('QUERY USER', info);

            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM users where id = ${args.id} `, (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        const user = results[0] || {};
                        resolve({
                            _typename: 'User',
                            name: user.name || null,
                            city: user.city || null,
                        });
                    }
                });
            });
        },
    },
};