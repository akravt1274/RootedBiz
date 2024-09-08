INSERT INTO
    "business" (
        "id",
        "category_id",
        "name",
        "description",
        "address",
        "date_created",
        "user_id"
    )
VALUES (
    '1',
'Restaurant',
'Cherry Pit Cafe',
'Description',
'808 Waukegan Rd Deerfield, IL 60015',
'09/08/2024',
'1')

SELECT * FROM business WHERE category_id = 1

INSERT INTO category (id, name) 
VALUES 
    (1, 'Restaurant'),
    (2, 'Retail'),
    (3, 'Service'),
    (4, 'Entertainment')


  