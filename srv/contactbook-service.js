
const cds = require('@sap/cds');


module.exports = cds.service.impl(async function (req,res,next) {
	
	const contactsService = await cds.connect.to('contactset');
	let { Contacts, Team } = this.entities;

	let srv = this;

	//using external service
	this.on('READ', Team, async (req, next) => {
		//we can actually get the roles of the logged in user here by looking at req.user from the request coming through
		//check to see what the request is and re-map the query

		//const tx = cds.tx();
		//let dbResults = await tx.run(req);
	
		let sBaseUrl = "/sap/opu/odata/iwbep/GWSAMPLE_BASIC/ContactSet?$top=20";
		
		let aContactSetResult = await contactsService.send({
			method: "GET",
			path: sBaseUrl
		});

		
		let aTeamMembers = aContactSetResult.map((x) => {
			return {
				ID : x.ContactGuid,
				FirstName : x.FirstName,
				LastName : x.LastName
			}
		})

		console.log(aTeamMembers);

		return aTeamMembers;

	});

	this.on('CREATE', Contacts, async(req, next) => {
		if (req.data.ID) {
			req.next();
		} else {
			req.reject ({
				code: 'Invalid create',
				message: 'Dataobject missing ID',
				status: 420
			})
		}
	});

	this.on('READ', Contacts, async(req, next) => {
		return next();
	})
});
