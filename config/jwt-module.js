const fs 		= require('fs');
const jwt 		= require('jsonwebtoken');

var privateKEY 	= fs.readFileSync('./private.key', 'utf8'); // to sign JWT
var publicKEY 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT

module.exports = {
	sign: (payload, $Options) => {
		/*
			sOptions = {
				issuer: "Authorizaxtion/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}
		*/

		// Token signing options
		var signOptions = {
			expiresIn: 	"30d",				// 30 days validity
			algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
		};
		return jwt.sign(payload, privateKEY, signOptions);
	},

	verify: (token, $Option) => {
		/*
			vOption = {
				issuer: "Authorization/Resource/This server",
				subject: "iam@user.me", 
				audience: "Client_Identity" // this should be provided by client
			}		
		*/
		var verifyOptions = {
			issuer: 	$Option.issuer,
			subject: 	$Option.subject,
			audience: 	$Option.audience,
			expiresIn: 	"30d",
			algorithm: 	["RS256"]
		};
		try {
			return jwt.verify(token, publicKEY, verifyOptions);
		}catch(err){
			return false;
		}
	}, 

	decode: (token) => {
		return jwt.decode(token, {complete: true});
	}
}