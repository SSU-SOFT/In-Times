SELECT *
	FROM News AS p
JOIN (SELECT aId 
	FROM News
	WHERE cId = 1 
	ORDER BY aId LIMIT 1010, 20) AS t ON t.aId = p.aId