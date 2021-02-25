
##
## HASHCODE PROJECT, 2021
## Makefile, by theo & fred
##

#--------   [Flag]   --------#
path1	=	./cpp
path2	=	./node

#------- Generate project ------#
all:
	npm run build --prefix node/
	node $(path2)/dist/index.js -f package.json
	$(MAKE) -C $(path1)


#------  Clean and build  ------#
clean:
	$(MAKE) -C $(path1) clean

fclean:
	$(MAKE) -C $(path1) fclean

re: fclean all

#------  function  ------#
archive:
	git archive -o hashcode2021.zip HEAD

.PHONY: all archive clean re fclean

.SILENT: clean fclean re