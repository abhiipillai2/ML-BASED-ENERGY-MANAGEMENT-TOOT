#!/bin/bash

database_name='elektron_master'
database_username='root'
database_password='Atom@002'

echo "Loading databse ...."
mysql -u${database_username} -p${database_password} ${database_name}


