export const selectOneHashtagText = `
    SELECT id, title
    FROM hashtags h
    WHERE h.title = $1;
`;

export const selectHashtagsText = `
    SELECT title
    FROM hashtags_articles hp
    INNER JOIN hashtags h on h.id = hp.hashtag_id
    WHERE hp.article_id = $1; 
`;

export const selectAllHashtagsText = `
    SELECT title
    FROM hashtags
`;

export const selectAuthorOfArticleText = `
    SELECT username, b
    FROM articles p
    INNER JOIN users u ON u.id = p.user_id 
    WHERE p.id = $1;  
`;

// User Query Texts

export const findUserText = `
SELECT * FROM users WHERE username=$1;
`;

export const insertUserText = `
INSERT INTO users (username,  password)
VALUES($1, $2)
ON CONFLICT (username) DO NOTHING
RETURNING *;
`;

export const patchUserText = `
UPDATE users 
SET username=COALESCE($1, username), password=COALESCE($2, password), bio=COALESCE($3, bio), updated_at=NOW()
WHERE id=$4
RETURNING *;
`;

// article Query Texts

export const countArticlesText = `
SELECT COUNT(p.id)
FROM articles p`;

export const countFeedArticlesText = `
SELECT COUNT(p.id)
FROM articles p
INNER JOIN users u ON u.id = p.user_id
INNER JOIN (
    SELECT *
    FROM followers f
    WHERE follower_id = $1
) AS selectedFollowers ON selectedFollowers.leader_id = u.id
`;

export const countArticlesByAuthorText = `
SELECT COUNT(p.id)
FROM articles p
INNER JOIN users u ON u.id = p.user_id
WHERE u.username = $1
`;

export const countArticlesFavoritedByUserText = `
SELECT COUNT(p.id)
FROM articles p
INNER JOIN (
    SELECT pf.article_id, COUNT(*) AS favorites_count 
    FROM articles_favorites pf
    WHERE pf.user_id = (
        SELECT id
        FROM users
        WHERE users.username = $1
        )
    GROUP BY pf.article_id
) AS favorites ON favorites.article_id = p.id
`;

export const countArticlesByTagText = `
SELECT COUNT(p.id)
FROM articles p
LEFT JOIN (SELECT pf.article_id, COUNT(*) AS favorites_count 
            FROM articles_favorites pf 
            GROUP BY pf.article_id
        ) AS favorites ON favorites.article_id = p.id
INNER JOIN (
    SELECT hp.article_id, h.title
    FROM hashtags_articles hp
    INNER JOIN hashtags h on h.id = hp.hashtag_id
    WHERE h.title = $1
) AS selected_hashtags ON selected_hashtags.article_id = p.id
`;

export const findArticlesText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at,
u.id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following,
COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
COALESCE(selectedFavorited.favorited, false) AS favorited,
COALESCE(hashtags.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
LEFT JOIN (
	SELECT af.article_id, af.user_id, true AS favorited
	FROM articles_favorites af 
	WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = a.id
LEFT JOIN (
	SELECT af.article_id, COUNT(*) AS favorites_count
	FROM articles_favorites af 
	GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = a.id
LEFT JOIN (
	SELECT ha.article_id, array_agg(h.title) AS hashtags
	FROM hashtags_articles ha
	INNER JOIN hashtags h ON h.id = ha.hashtag_id
	GROUP BY ha.article_id
) AS hashtags ON hashtags.article_id = a.id
ORDER BY created_at
DESC
LIMIT $2
OFFSET $3;
`;

export const findArticlesByAuthorText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at,
u.id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following,
COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
COALESCE(selectedFavorited.favorited, false) AS favorited,
COALESCE(hashtags.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
LEFT JOIN (
	SELECT af.article_id, af.user_id, true AS favorited
	FROM articles_favorites af 
	WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = a.id
LEFT JOIN (
	SELECT af.article_id, COUNT(*) AS favorites_count
	FROM articles_favorites af 
	GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = a.id
LEFT JOIN (
	SELECT ha.article_id, array_agg(h.title) AS hashtags
	FROM hashtags_articles ha
	INNER JOIN hashtags h ON h.id = ha.hashtag_id
	GROUP BY ha.article_id
) AS hashtags ON hashtags.article_id = a.id
WHERE u.username = $2
ORDER BY created_at
DESC
LIMIT $3
OFFSET $4;
`;

export const findArticlesFavoritedByUserText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at,
u.id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following,
COALESCE(favorites_count, 0) AS favorites_count, 
COALESCE(favorited, false) AS favorited,
COALESCE(hashtags.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
INNER JOIN (
    SELECT af.article_id, af.user_id, COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
    COALESCE(selectedFavorited.favorited, false) AS favorited
    FROM articles_favorites af
    LEFT JOIN (
        SELECT af.article_id, af.user_id, true AS favorited
        FROM articles_favorites af 
        WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = af.article_id
    LEFT JOIN (
        SELECT af.article_id, COUNT(*) AS favorites_count
        FROM articles_favorites af 
        GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = af.article_id
    WHERE af.user_id = (
        SELECT id
        FROM users
        WHERE users.username = $2
    )
) AS favorite ON favorite.article_id = a.id
LEFT JOIN (
	SELECT ha.article_id, array_agg(h.title) AS hashtags
	FROM hashtags_articles ha
	INNER JOIN hashtags h ON h.id = ha.hashtag_id
	GROUP BY ha.article_id
) AS hashtags ON hashtags.article_id = a.id
ORDER BY created_at
DESC
LIMIT $3
OFFSET $4;
`;

export const findArticlesByTagText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at,
u.id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following,
COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
COALESCE(selectedFavorited.favorited, false) AS favorited,
COALESCE(filtered_tag_arrays.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
LEFT JOIN (
	SELECT af.article_id, af.user_id, true AS favorited
	FROM articles_favorites af 
	WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = a.id
LEFT JOIN (
	SELECT af.article_id, COUNT(*) AS favorites_count
	FROM articles_favorites af 
	GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = a.id
INNER JOIN (
	SELECT tag_arrays.article_id, tag_arrays.hashtags
	FROM(
		SELECT ha.article_id, array_agg(h.title) AS hashtags
		FROM hashtags_articles ha
		INNER JOIN hashtags h ON h.id = ha.hashtag_id
		GROUP BY ha.article_id
	) as tag_arrays
	WHERE $2 = ANY(hashtags)
) AS filtered_tag_arrays ON filtered_tag_arrays.article_id = a.id
ORDER BY created_at
DESC
LIMIT $3
OFFSET $4;
`;

export const findFeedArticlesText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at, u.id AS author_id, 
u.username, u.bio, 
COALESCE(selectedFollowers.following, false) AS following, 
COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
COALESCE(selectedFavorited.favorited, false) AS favorited,
COALESCE(hashtags.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
INNER JOIN (
	SELECT leader_id, (
		SELECT true
	) AS following 
	FROM followers f
	WHERE follower_id = $1
) AS selectedFollowers ON selectedFollowers.leader_id = u.id
LEFT JOIN (
	SELECT af.article_id, af.user_id, true AS favorited
	FROM articles_favorites af 
	WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = a.id
LEFT JOIN (
	SELECT af.article_id, COUNT(*) AS favorites_count
	FROM articles_favorites af 
	GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = a.id
LEFT JOIN (
	SELECT ha.article_id, array_agg(h.title) AS hashtags
	FROM hashtags_articles ha
	INNER JOIN hashtags h ON h.id = ha.hashtag_id
	GROUP BY ha.article_id
) AS hashtags ON hashtags.article_id = a.id
ORDER BY created_at
DESC
LIMIT $2
OFFSET $3;
`;

export const findArticleByResourceIdText = `
SELECT a.id, a.resource_id, a.slug, a.title, a.description, a.body, a.created_at, a.updated_at, u.id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following,
COALESCE(selectedFavoritesCount.favorites_count, 0) AS favorites_count, 
COALESCE(selectedFavorited.favorited, false) AS favorited,
COALESCE(hashtags.hashtags, ARRAY[]::text[]) AS tag_list
FROM articles a
INNER JOIN users u ON u.id = a.user_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
LEFT JOIN (
	SELECT af.article_id, af.user_id, true AS favorited
	FROM articles_favorites af 
	WHERE af.user_id = $1) AS selectedFavorited ON selectedFavorited.article_id = a.id
LEFT JOIN (
	SELECT af.article_id, COUNT(*) AS favorites_count
	FROM articles_favorites af 
	GROUP BY af.article_id) AS selectedFavoritesCount ON selectedFavoritesCount.article_id = a.id
LEFT JOIN (
	SELECT ha.article_id, array_agg(h.title) AS hashtags
	FROM hashtags_articles ha
	INNER JOIN hashtags h ON h.id = ha.hashtag_id
	GROUP BY ha.article_id
) AS hashtags ON hashtags.article_id = a.id
WHERE a.resource_id = $2;
`;

export const insertArticleText = `
    INSERT INTO articles (title, description, body, slug, user_id, resource_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
`;

export const selectHashtagCountText = `
    SELECT hashtag_id as id, count(hashtag_id)
    FROM hashtags_articles ha
    WHERE hashtag_id = (
        SELECT id
        FROM hashtags h
        WHERE h.title = $1
    )
    GROUP BY hashtag_id;
`;

export const insertHashtagText = `
INSERT INTO hashtags (title)
VALUES ($1) ON CONFLICT (title) DO NOTHING
RETURNING id, title;
`;

export const insertHashtagArticleText = `
INSERT INTO hashtags_articles (hashtag_id, article_id)
VALUES ((
    SELECT id
    FROM hashtags h
    WHERE h.title = $1
    ), $2) ON CONFLICT (hashtag_id, article_id) DO NOTHING;
`;

export const deleteHashtagText = `
    DELETE FROM hashtags h WHERE h.title = $1;  
`;

export const deleteHashtagArticleText = `
    DELETE FROM hashtags_articles ha WHERE ha.hashtag_id = $1 AND ha.article_id = $2;  
`;

export const patchArticleText = `
    UPDATE articles p
    SET 
        title=COALESCE($1, title), 
        description=COALESCE($2, description), 
        body=COALESCE($3, body),
        slug=COALESCE($4, slug),
        updated_at=NOW()
    WHERE p.resource_id = $5
    RETURNING *;
`;

export const deleteArticleText = `
DELETE FROM articles p WHERE p.resource_id=$1;
`;

export const checkFavoriteText = `
SELECT EXISTS(
    SELECT 1
    FROM articles_favorites pf
    WHERE pf.user_id = $1 AND pf.article_id = (
	 SELECT id
        FROM articles p
        WHERE p.resource_id = $2
	)
);
`;

export const insertFavoriteArticleDataText = `
    INSERT INTO articles_favorites (user_id, article_id) 
    VALUES($1, (
        SELECT id
        FROM articles p
        WHERE p.resource_id = $2
    ))
    ON CONFLICT DO NOTHING;
`;

export const deleteFavoriteArticleDataText = `
    DELETE FROM articles_favorites pf
    WHERE pf.user_id = $1 AND pf.article_id = (
        SELECT id
        FROM articles p
        WHERE p.resource_id = $2
    );
`;

// Profile Query Texts

export const findProfileText = `
SELECT u.username, u.bio, (
    SELECT EXISTS(
            SELECT 1
            FROM followers f
            WHERE f.leader_id = (
                SELECT id
                FROM users
                WHERE users.username = $1
            ) AND f.follower_id = $2
        ) AS following
    )
    FROM users u
    WHERE u.username = $3;
`;

export const insertFollowDataText = `
    INSERT INTO followers(leader_id, follower_id) VALUES((
        SELECT id
        FROM users u
        WHERE u.username = $1
    ), $2)
    ON CONFLICT (leader_id, follower_id) DO NOTHING;
`;

export const deleteFollowDataText = `
    DELETE FROM followers f
    WHERE f.leader_id = (
        SELECT id
        FROM users u
        WHERE u.username = $1
    ) AND f.follower_id = $2;
`;

// Comment Query Texts

export const insertCommentText = `
INSERT INTO comments (body, user_id, article_id, resource_id) VALUES($1, $2, (
    SELECT id AS article_id
    FROM articles p
    WHERE p.resource_id = $3
), $4)
RETURNING *;
`;

export const findCommentText = `
    SELECT c.resource_id, c.created_at, c.updated_at, c.body, c.user_id AS author_id, u.username, u.bio,
    COALESCE(selectedFollowers.following, false) AS following
    FROM comments c
    INNER JOIN users u ON u.id = c.user_id
    LEFT JOIN (
        SELECT leader_id, follower_id, (
            SELECT true
        ) AS following 
        FROM followers f
    ) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
    WHERE c.resource_id = $2
`;

export const countCommentsText = `
    SELECT COUNT(c.id)
    FROM comments c
    WHERE c.article_id = (
        SELECT id
        FROM articles p
        WHERE p.resource_id = $1
    );
`;

export const findCommentsText = `
SELECT c.resource_id, c.created_at, c.updated_at, c.body, c.user_id AS author_id, u.username, u.bio,
COALESCE(selectedFollowers.following, false) AS following
FROM comments c
INNER JOIN users u ON u.id = c.user_id
INNER JOIN articles p ON p.id = c.article_id
LEFT JOIN (
	SELECT leader_id, follower_id, (
		SELECT true
	) AS following 
	FROM followers f
) AS selectedFollowers ON selectedFollowers.leader_id = u.id AND selectedFollowers.follower_id = $1
WHERE p.resource_id = $2
ORDER BY created_at
DESC
`;

export const deleteCommentText = `
DELETE FROM comments c WHERE c.id=(
	SELECT id
	FROM comments
	WHERE comments.resource_id = $1
) AND c.article_id = (
	SELECT id
	FROM articles p
	WHERE p.resource_id = $2
);
`;

// Tag Query Texts

export const getPopularTagsText = `
    SELECT h.title
    FROM hashtags_articles hp
    JOIN hashtags h ON h.id = hp.hashtag_id
    GROUP BY h.title
    ORDER BY count(h.title)
    DESC
    LIMIT $1;
`;
