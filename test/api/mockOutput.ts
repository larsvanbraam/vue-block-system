export default {
	"id": "/home.json",
	"data": {
		"headerTheme": "red"
	},
	"title": "Home",
	"blocks": [
		{
			"id": "blockFoo",
			"data": {
				"id": "BlockFoo"
			},
			"blockIndex": 0
		},
		{
			"id": "blockBar",
			"data": {
				"blocks": [
					{
						"id": "blockFoo",
						"data": {
							"id": "BlockFoo"
						},
						"blockIndex": 2
					}
				],
				"id": "BlockBar"
			},
			"blockIndex": 1
		}
	]
}
