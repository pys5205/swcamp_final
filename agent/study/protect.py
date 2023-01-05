import os
import shutil
import py_compile


# py 파일이 있는 폴더
src_dir = os.getcwd()
# pyc 파일을 copy할 폴더 이름
target_dir = os.path.join(src_dir, 'compiled')
src_list = ['cmp.py']
    # target_dir폴더가 없으면 생성
if not os.path.exists(target_dir):
    print ('Target Dir is NOT exist', target_dir)
    os.mkdir (target_dir)
    # 소스파일의 리스트에서 파일 하나씩 처리한다
for dst_file in src_list:
	# py 파일을 하나씩 pyc 로 bytecode로 컴파일한다.
    if (dst_file.endswith('.py')):
        # py--> pyc 로 확장자 변경
        compiled_py = dst_file.replace('.py', '.pyc')
        print (dst_file, '-->', fc)
        # py 파일을 pyc 로 컴파일하고 output을 target dir에 저장
        py_compile.compile(f, os.path.join(target_dir, dst_file))          
    else:
        # *.py 파일이 아닌 경우 copy
        shutil.copy(os.path.join(src_dir,dst_file), target_dir)