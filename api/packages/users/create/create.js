const {
	databases,
	datatypes,
	model
} = require( 'databaser' );

const User = model( {
	name: 'user',
	schema: {
		id: datatypes.UUID( {
			nullable: false,
			unique: true,
			primary: true
		} ),
		email: datatypes.email( {
			initial: null,
			index: true // add a basic index for this column
		} ),
		name: {
			first: datatypes.string( {
				initial: null
			} ),
			last: datatypes.string( {
				initial: null
			} )
		},
		meta: datatypes.JSON(),
		timestamps: {
			created: datatypes.ISODate(),
			updated: datatypes.ISODate(),
			deleted: datatypes.ISODate( {
				initial: null
			} )
		}
	}
} );

module.exports = {
	main: async function( args ) {
		const new_user_info = {
			email: args.email,
			name: {
				first: args.name__first,
				last: args.name__last
			},
			meta: {}
		};

		const new_user = User.create( new_user_info );
	
		console.dir( new_user );
	
		const validation_errors = User.validate( new_user );
		if ( validation_errors.length ) {
			throw new Error( `Invalid user:
			${ JSON.stringify( validation_errors, null, 4 ) }
			` );
		}

console.log( 'hello' );
console.dir( {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_CACERT
} );

		const users_db = await databases.postgres.get( User, {
			debug: true
		} );

		await users_db.put( new_user );

		return {
			body: new_user,
			headers: {
				"content-type": "application/json; charset=UTF-8"
			}
		};
	}
};
