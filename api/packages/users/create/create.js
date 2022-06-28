const simplecoder = require( 'simplecoder' );

function main( args ) {
	const new_user = {
		email: args.email
	};

	return {
		body: simplecoder.encode( new_user.email ?? '' )
	};
}
