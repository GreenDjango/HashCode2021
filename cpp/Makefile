
##
## EPITECH PROJECT, 2018
## Makefile V2, by fred
## File description:
## perso_libcpp
##

#--------   [Flag gcc]   --------#
cc	=	g++
type	=	cpp
header	=	.
cflags	=	-Wall -Wextra -I $(header) -g
extra	=

#--------      [Vars]     --------#
exe	=	hashcode.out
obj_dir	=	build
modules	=	.
src	=	$(foreach module,$(modules),$(wildcard ./$(module)/*.$(type)))
obj	=	$(patsubst %.$(type), $(obj_dir)/%.o,$(notdir $(src)))
dep	=	$(patsubst %.$(type), $(obj_dir)/%.d,$(notdir $(src)))

#--------     Colors    --------#
def	=	\033[0m
red	=	\033[1;31m
green	=	\033[1;32m
blue	=	\033[1;34m
white	=	\033[1;37m
yellow	=	\033[1;33m

#------- Generate project ------#
all: $(obj_dir) $(exe)

$(exe): $(obj)
	@printf "    └─   $(green)./$@$(def)\n"
	$(cc) -o $@ $(obj)

$(obj_dir):
	@printf "$(green)[%s]\n$(def)" build
	@printf "    ├─% 3s"
	mkdir -p $@

define get_obj
$(patsubst %.$(type), $(obj_dir)/%.o,$(notdir $1)): $1
	@printf "$(yellow)├[compiling]$(def) - $(white)$$<$(def)...\r"
	@$(cc) $(cflags) -MMD -MP -c -o $$@ $$< $(extra)
	@printf "    ├─% 3s$(green)[ok]$(def) - $(white)$$<$(def)...% 10s\n"
endef

-include $(dep)

$(foreach source,$(src), $(eval $(call get_obj,$(source))))

#------  Clean and build  ------#
clean:
	@printf "$(red)[%s]\n$(def)" clean
	@printf "    ├─% 3srm(obj)\n"
	@rm -f $(obj)

fclean: clean
	@printf "    ├─% 3s"
	rm -f $(exe)
	@printf "    └─% 3s"
	rm -rf $(obj_dir)
	@printf "\n"

re: fclean all