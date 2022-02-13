const router = require('express').Router();
const xmlbuilder = require('xmlbuilder');
const { PNID } = require('../../../models/pnid');
const clientHeaderCheck = require('../../../middleware/client-header');

/**
 * [GET]
 * Replacement for: https://account.pretendo.cc/v1/api/miis
 * Description: Returns a list of NNID miis
 */
router.get('/', clientHeaderCheck, async (request, response) => {

	const { pids } = request.query;

	const results = await PNID.where('pid', pids);
	const miis = [];

	for (const user of results) {
		const  { mii } = user;

		const miiImages = [
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/normal_face.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/normal_face.png`,
				type: 'standard'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/frustrated.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/frustrated.png`,
				type: 'frustrated_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/smile_open_mouth.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/smile_open_mouth.png`,
				type: 'happy_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/wink_left.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/wink_left.png`,
				type: 'like_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/normal_face.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/normal_face.png`,
				type: 'normal_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/sorrow.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/sorrow.png`,
				type: 'puzzled_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/surprised_open_mouth.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/surprised_open_mouth.png`,
				type: 'surprised_face'
			},
			{
				cached_url: `http://mii-images.cdn.pretendo.cc/${user.pid}/body.png`,
				id: mii.id,
				url: `http://mii-images.cdn.pretendo.cc/${user.pid}/body.png`,
				type: 'whole_body'
			}
		];

		miis.push({
			data: mii.data.replace(/(\r\n|\n|\r)/gm, ''),
			id: mii.id,
			images: {
				image: miiImages
			},
			name: mii.name,
			pid: user.pid,
			primary: mii.primary ? 'Y' : 'N',
			user_id: user.username
		});
	}

	//console.log(results[0].mii.data.replace(/(\r\n|\n|\r)/gm, ''));

	response.send(xmlbuilder.create({
		miis: {
			mii: miis
		}
	}).end());
});

module.exports = router;