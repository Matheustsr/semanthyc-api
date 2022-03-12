module.exports = {
    dialect: 'postgres',
	dialectOptions: {
		ssl: {
		  require: true,
		  rejectUnauthorized: false
		}
	},
    host: 'ec2-52-70-186-184.compute-1.amazonaws.com',
    username: 'zecnzlcrkodmdb',
    password: 'aaecaeef48641fc5dd1c6e8062aad907b34f29b7e6eb64120f38c33bd8b6e55f',
    database: 'dcsnjapckqhnso',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
