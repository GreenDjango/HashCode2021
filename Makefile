
##
## HASHCODE PROJECT, 2021
## Makefile, by theo & fred
##

#--------   [Flag]   --------#
path1	=	./cpp

#------- Generate project ------#
all:
	$(MAKE) -C $(path1)


#------  Clean and build  ------#
clean:
	$(MAKE) -C $(path1) clean

fclean:
	$(MAKE) -C $(path1) fclean

re: fclean all

#------  function  ------#
.PHONY: all clean re fclean

.SILENT: clean fclean re