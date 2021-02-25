
##
## EPITECH PROJECT, 2021
## Makefile, by fred
## File description:
## decide which parts need to be recompiled
##

#========  [Config]  ========#
dirs	=	.
src	=	$(foreach dir,$(dirs),$(wildcard ./$(dir)/*.$(type)))
obj	=	$(patsubst %.$(type), $(folder)/%.o,$(notdir $(src)))
dep	=	$(patsubst %.$(type), $(folder)/%.d,$(notdir $(src)))

type	=	cpp
cc	=	g++
folder	=	build
exe	=	hashcode.out
cflags	=	-Wall -Wextra -I $(header) -g
header	=	.
extra	=

#========  [Colors]  ========#
define printcolor
	printf "\033[1;3%dm%s\033[0m\n" $1 $2
endef

#========  [Create]  ========#
all: $(folder) $(exe)

$(exe): $(obj)
	@printf "    └─   " ; $(call printcolor,2,"./$@")
	$(cc) -o $@ $(obj)

$(folder):
	@$(call printcolor,2,"[build]") ; printf "    ├─% 3s"
	mkdir -p $@

define get_obj
$(patsubst %.$(type), $(folder)/%.o,$(notdir $1)): $1
	@printf "    ├─% 3s\033[1;33m[compiling]\033[0m - \033[1;37m$$<\033[0m...\r"
	@$(cc) $(cflags) -MMD -MP -c -o $$@ $$< $(extra)
	@printf "    ├─% 3s\033[1;32m[ok]\033[0m - \033[1;37m$$<\033[0m...% 10s\n"
endef

-include $(dep)

$(foreach source,$(src), $(eval $(call get_obj,$(source))))

#------  Clean and build  ------#
clean:
	@$(call printcolor,1,"[clean]") ; printf "    ├─% 3s"
	rm -rf $(folder)

fclean: clean
	@printf "    └─% 3s"
	rm -f $(exe)

re: fclean all