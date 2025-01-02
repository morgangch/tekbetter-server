"""Initial migration

Revision ID: 63fce751e86b
Revises: 
Create Date: 2025-01-03 00:33:50.460978

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '63fce751e86b'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('microsoft_sessions',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('epitech_login', sa.String(length=255), nullable=True),
    sa.Column('is_expired', sa.Boolean(), nullable=False),
    sa.Column('json_cookies', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('students',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('login', sa.String(length=255), nullable=False),
    sa.Column('password', sa.Text(), nullable=True),
    sa.Column('intranet_token', sa.Text(), nullable=True),
    sa.Column('last_token_update', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('students')
    op.drop_table('microsoft_sessions')
    # ### end Alembic commands ###
